"use client";
import axios from "axios";
import { ChangelogList } from "@/components/changelogs-list";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const [slug, setSlug] = useState("");
  const [changelogs, setChangelogs] = useState([]);
  const params = useParams();
  const slugFromParams = params.slug;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSlug(slugFromParams as string);
  }, [slugFromParams]);

  useEffect(() => {
    const fetchChangelogs = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/changelog/changelogs/${slug}`
      );
      const changelogs = res.data.changelogs;
      setChangelogs(changelogs);
      setIsLoading(false);
    };
    fetchChangelogs();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <Skeleton className="h-[500px] w-full" />
      ) : (
        <ChangelogList changelogs={changelogs} slug={slug} />
      )}
    </div>
  );
}
