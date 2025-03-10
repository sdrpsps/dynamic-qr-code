import { GithubIcon } from "lucide-react";

export default function GitHubCorner() {
  return (
    <a
      href="https://github.com/sdrpsps/dynamic-qr-code"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-10 bottom-10 z-50 p-2 rounded-full shadow-lg hover:opacity-80 transition-opacity md:right-5 md:bottom-5 dark:bg-gray-800 dark:shadow-gray-600"
      aria-label="View source on GitHub"
      title="View source on GitHub"
    >
      <GithubIcon className="text-indigo-400 dark:text-indigo-300" />
    </a>
  );
}
