import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Changelog } from "@/types/changelog";
import { marked } from "marked";

export function ChangelogList({ changelogs }: { changelogs: Changelog[] }) {
  return (
    <div className="space-y-8">
      {changelogs && changelogs.length > 0 ? (
        changelogs.map((changelog: Changelog, index: number) => (
          <div key={changelog.projectId}>
            <div className="flex items-center gap-3 mb-4">
              <time className="text-sm text-muted-foreground">
                {new Date(changelog.createdAt).toLocaleDateString()}
              </time>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="text-xl font-semibold">{changelog.version}</h3>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div
                  className="changelog-content"
                  dangerouslySetInnerHTML={{
                    __html: marked(changelog.changelog),
                  }}
                />
              </CardContent>
            </Card>

            {index < changelogs.length - 1 && (
              <div className="relative mt-8 mb-8">
                <div className="absolute left-0 right-0 h-px bg-border" />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground">
          No changelogs found
        </div>
      )}
    </div>
  );
}
