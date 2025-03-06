"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Changelog } from "@/types/changelog";
import { marked } from "marked";
import { Calendar, GitCommit, Package } from "lucide-react";
import { useEffect, useState } from "react";
import CommandPalette from "./command-palette";

export function ChangelogList({
  changelogs,
  slug,
}: {
  changelogs: Changelog[];
  slug: string;
}) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [filteredChangelogs, setFilteredChangelogs] =
    useState<Changelog[]>(changelogs);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredChangelogs(changelogs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = changelogs.filter(
      (changelog) =>
        changelog.title.toLowerCase().includes(query) ||
        changelog.version.toLowerCase().includes(query) ||
        changelog.changelog.toLowerCase().includes(query)
    );
    setFilteredChangelogs(filtered);
  }, [searchQuery, changelogs]);

  marked.setOptions({
    gfm: true,
    breaks: true, // Treat single line breaks as `<br>`
  });

  // Function to parse and highlight different types of changes
  const renderChangelogContent = (content: string) => {
    // Add custom styling to the markdown
    const styledContent = content
      .replace(/### (.*)/g, '### <span class="text-primary">$1</span>')
      .replace(
        /\*\*(Added|New|Feature):\*\*/g,
        '**<span class="text-green-500">$1:</span>**'
      )
      .replace(
        /\*\*(Fixed|Bug|Fix):\*\*/g,
        '**<span class="text-amber-500">$1:</span>**'
      )
      .replace(
        /\*\*(Changed|Updated|Improved):\*\*/g,
        '**<span class="text-blue-500">$1:</span>**'
      )
      .replace(
        /\*\*(Removed|Deprecated):\*\*/g,
        '**<span class="text-red-500">$1:</span>**'
      );

    return { __html: marked(styledContent) };
  };

  return (
    <>
      <CommandPalette
        isOpen={isCommandOpen}
        setIsOpen={setIsCommandOpen}
        changelogs={changelogs}
        setSearchQuery={setSearchQuery}
      />

      <div className="relative">
        <h1 className="text-2xl font-bold">Changelogs for {slug}</h1>
        <button
          onClick={() => setIsCommandOpen(true)}
          className="absolute right-0 top-0 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md border border-input bg-background shadow-sm"
        >
          <span>Search changelogs</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <div className="space-y-8 mt-16">
        {filteredChangelogs && filteredChangelogs.length > 0 ? (
          filteredChangelogs.map((changelog: Changelog, index: number) => (
            <div
              key={changelog.projectId}
              id={`changelog-${changelog.projectId}`}
              className="group"
            >
              <Card className="overflow-hidden border-border/40 transition-all duration-200 hover:border-primary/20 hover:shadow-md">
                <CardHeader className="pb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-primary/5 text-primary font-mono"
                    >
                      <Package className="mr-1 h-3 w-3" />
                      {changelog.version}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
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
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <GitCommit className="h-5 w-5 text-primary" />
                    {changelog.title}
                  </h3>
                </CardHeader>

                <CardContent className="pt-4">
                  <div
                    className="changelog-content prose prose-sm dark:prose-invert max-w-none markdown-content"
                    dangerouslySetInnerHTML={renderChangelogContent(
                      changelog.changelog
                    )}
                  />
                </CardContent>
              </Card>

              {index < filteredChangelogs.length - 1 && (
                <div className="relative my-8 flex items-center justify-center">
                  <div className="absolute left-0 right-0 h-px bg-border" />
                  <div className="relative bg-background px-2 text-xs text-muted-foreground">
                    {new Date(
                      filteredChangelogs[index + 1].createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <h3 className="text-lg font-medium">No changelogs found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery
                ? "Try a different search term"
                : "No changelog entries are available"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
