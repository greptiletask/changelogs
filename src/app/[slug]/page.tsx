"use client";
import axios from "axios";
import { ChangelogList } from "@/components/changelogs-list";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page() {
  const [slug, setSlug] = useState("");
  const [changelogs, setChangelogs] = useState([]);
  const params = useParams();
  const slugFromParams = params.slug;

  useEffect(() => {
    setSlug(slugFromParams as string);
  }, [slugFromParams]);

  useEffect(() => {
    const fetchChangelogs = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/changelog/changelogs/${slug}`
      );
      const changelogs = res.data.changelogs;
      setChangelogs(changelogs);
    };
    fetchChangelogs();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <ChangelogList changelogs={changelogs} slug={slug} />
    </div>
  );
}
