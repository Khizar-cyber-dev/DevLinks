'use client';

import { useState, useCallback, KeyboardEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X, Image as ImageIcon, Code } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  image: z.any().optional(),
  techStacks: z.array(z.string().min(1)).min(1, "At least one tech stack is required"),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional()
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function CreateProjectPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  console.log(projectId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      techStacks: [],
    },
  });

  useEffect(() => {
    if (projectId) {
      const fetchProjectData = async () => {
        const response = await fetch(`/api/project/${projectId}`);
        const projectData = await response.json();

        setValue("title", projectData.title);
        setValue("description", projectData.description);
        setValue(
          "techStacks",
          projectData.techStacks.map((t: any) =>
            typeof t === "string" ? t : t.name
          )
        );
        setValue("githubUrl", projectData.githubUrl);
        setValue("liveUrl", projectData.liveUrl);
        setPreviewImage(projectData.imageUrl);
      };

      fetchProjectData();
    }
  }, [projectId, setValue]);

  const techStacks = watch("techStacks");

  const addTechStack = useCallback(() => {
    const tech = techInput.trim();
    if (tech && !techStacks.includes(tech)) {
      setValue("techStacks", [...techStacks, tech], { shouldValidate: true });
      setTechInput(""); 
    }
  }, [techInput, techStacks, setValue]);

  const removeTechStack = (techToRemove: string) => {
    setValue(
      "techStacks",
      techStacks.filter((tech) => tech !== techToRemove),
      { shouldValidate: true }
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechStack();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("image", file);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      let imageUrl = null;

      if (data.image && typeof data.image !== "string") {
        // Convert image file to base64
        const file = data.image as File;
        const reader = new FileReader();
        imageUrl = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else if (typeof data.image === "string") {
        imageUrl = data.image;
      }

      const payload: any = {
        title: data.title,
        description: data.description,
        techStacks: data.techStacks,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
      };
      if (imageUrl) {
        payload.imageUrl = imageUrl;
      }

      const response = await fetch(projectId ? `/api/project/${projectId}` : '/api/project', {
        method: projectId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || (projectId ? 'Failed to update project' : 'Failed to create project'));
      }

      toast(projectId ? 'Project updated successfully!' : 'Project created successfully!');
      reset();
      setPreviewImage(null);
      router.push('/dashboard');
    } catch (error) {
      console.error('Detailed error in form submission:', error);
      toast(error instanceof Error ? error.message : 'Failed to process project. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              {projectId ? 'Edit Project' : 'Create New Project'}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  {...register("title")}
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.title ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="My Awesome Project"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.description ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Tell us about your project..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Project preview"
                        className="mx-auto h-48 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setValue("image", null);
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Upload an image</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stacks</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {techStacks.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechStack(tech)}
                        className="ml-1.5 inline-flex text-indigo-600 hover:text-indigo-900 focus:outline-none"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Code className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="React, Node.js, etc."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addTechStack}
                    className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {errors.techStacks && <p className="mt-1 text-sm text-red-600">{errors.techStacks.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL (Optional)</label>
                <input
                  {...register("githubUrl")}
                  type="string"
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.githubUrl ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="https://github.com/username/repo"
                />
                {errors.githubUrl && <p className="mt-1 text-sm text-red-600">{errors.githubUrl.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live URL (Optional)</label>
                <input
                  {...register("liveUrl")}
                  type="string"
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.liveUrl ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="https://your-project.com"
                />
                {errors.liveUrl && <p className="mt-1 text-sm text-red-600">{errors.liveUrl.message}</p>}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setPreviewImage(null);
                    router.push("/")
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : projectId ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};