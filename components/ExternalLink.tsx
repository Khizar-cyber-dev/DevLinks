import { Github, Link2, Linkedin, Mail, Twitter } from "lucide-react";
import { Badge } from "./ui/badge";

export const ExternalLinkCard = ({ title, url }: { title: string; url: string }) => {
  const getIcon = () => {
    if (url.includes('github.com')) return <Github className="h-4 w-4" />;
    if (url.includes('twitter.com') || url.includes('x.com')) return <Twitter className="h-4 w-4" />;
    if (url.includes('linkedin.com')) return <Linkedin className="h-4 w-4" />;
    if (url.includes('mailto:')) return <Mail className="h-4 w-4" />;
    return <Link2 className="h-4 w-4" />;
  };

  return (
    <Badge variant="outline" className="px-3 py-1 hover:bg-accent/50 transition-colors">
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
        {getIcon()}
        <span>{title}</span>
      </a>
    </Badge>
  );
};