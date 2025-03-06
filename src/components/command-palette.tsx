"use client";

import { useState, useEffect, useRef } from "react";
import { Command } from "cmdk";
import type { Changelog } from "@/types/changelog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, GitCommit, Package, Search } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  changelogs: Changelog[];
  setSearchQuery: (query: string) => void;
}

export function CommandPalette({
  isOpen,
  setIsOpen,
  changelogs,
  setSearchQuery,
}: CommandPaletteProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleSelect = (changelogId: string) => {
    setIsOpen(false);

    setTimeout(() => {
      const element = document.getElementById(`changelog-${changelogId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });

        element.classList.add("highlight-animation");

        const dot = element.querySelector(".timeline-dot");
        if (dot) {
          dot.classList.add("ring-4", "ring-primary", "ring-opacity-50");
          setTimeout(() => {
            dot.classList.remove("ring-4", "ring-primary", "ring-opacity-50");
          }, 2000);
        }

        setTimeout(() => {
          element.classList.remove("highlight-animation");
        }, 2000);
      }
    }, 100);
  };

  const handleSearch = (value: string) => {
    setInputValue(value);
    setSearchQuery(value);
  };

  const getSnippet = (text: string, searchTerm: string, maxLength = 100) => {
    if (!searchTerm) return text.slice(0, maxLength) + "...";

    const lowerText = text.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();
    const index = lowerText.indexOf(lowerSearchTerm);

    if (index === -1) return text.slice(0, maxLength) + "...";

    const start = Math.max(0, index - 40);
    const end = Math.min(text.length, index + searchTerm.length + 40);

    let snippet = text.slice(start, end);
    if (start > 0) snippet = "..." + snippet;
    if (end < text.length) snippet = snippet + "...";

    return snippet;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={handleSearch}
              placeholder="Search changelogs by version, title, or content..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[500px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm">
              No changelogs found.
            </Command.Empty>

            {changelogs
              .filter(
                (changelog) =>
                  changelog.title
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  changelog.version
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  changelog.changelog
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
              )
              .map((changelog) => (
                <Command.Item
                  key={changelog.projectId}
                  value={`${changelog.version} ${changelog.title}`}
                  onSelect={() => handleSelect(changelog.projectId)}
                  className="px-2 py-3 rounded-md cursor-pointer data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        <span className="font-medium">{changelog.version}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(changelog.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>

                    <div className="font-medium flex items-center gap-1">
                      <GitCommit className="h-3 w-3 text-muted-foreground" />
                      {changelog.title}
                    </div>

                    {inputValue && (
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {getSnippet(changelog.changelog, inputValue)}
                      </div>
                    )}
                  </div>
                </Command.Item>
              ))}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default CommandPalette;
