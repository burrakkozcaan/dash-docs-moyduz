import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface StudioPost {
  title: string;
  description: string;
  date: string;
  image: string;
}

interface CreativeStudioProps {
  heading?: string;
  contactHref?: string;
  posts?: StudioPost[];
  featuredTitle?: string;
  featuredImage?: string;
  featuredHref?: string;
}

const defaultPosts: StudioPost[] = [
  {
    title: "The Future of User Experience in 2025",
    description:
      "Discover how motion design, accessibility, and micro-interactions are shaping the next generation of interfaces.",
    date: "March 10, 2025",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Design Systems that Scale Across Teams",
    description:
      "Learn how we use unified design tokens and shared libraries to keep large projects consistent and efficient.",
    date: "February 22, 2025",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
];

export function CreativeStudio({
  heading = "Explore our creative studio.",
  contactHref = "https://dub.sh/NHu6ZMt",
  posts = defaultPosts,
  featuredTitle = "Inside our design process",
  featuredImage = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
  featuredHref = "https://dub.sh/NHu6ZMt",
}: CreativeStudioProps) {
  return (
    <section className="bg-background py-32 w-full">
      <div className="container mx-auto">
        <div className="flex flex-col gap-12 px-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-8">
            <h2 className="max-w-lg flex-1 justify-between text-3xl text-foreground font-bold whitespace-pre-line md:text-5xl">
              {heading}
            </h2>
            <Button asChild className="rounded-xl">
              <a href={contactHref}>
                Contact us
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-[#f5f7678] text-card-foreground flex flex-col gap-6 col-span-1 rounded-xl border-0 p-4 shadow-none"
              >
                <div className="flex h-full w-full flex-col justify-between gap-4">
                  <div className="relative w-full">
                    <img
                      alt={post.title}
                      className="size-24 rounded-xl lg:size-32 dark:invert"
                      src={post.image}
                    />
                    <div className="absolute top-0 right-0 flex items-start justify-end">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <Plus className="size-5 rounded-full bg-secondary p-0.5" />
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                    <h3 className="text-xl text-black font-medium">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-6 min-h-[30rem] rounded-xl border-0 bg-card py-0 shadow-none md:col-span-2 md:min-h-[32rem]">
              <a
                href={featuredHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    alt={featuredTitle}
                    className="aspect-[4/3] h-full w-full object-cover"
                    src={featuredImage}
                    fill
                  />
                  <div className="absolute top-0 flex w-full items-center justify-between p-8">
                    <div className="text-lg font-bold text-white">studio®</div>
                    <Plus className="size-5 rounded-full bg-secondary p-0.5" />
                  </div>
                  <div className="absolute bottom-0 flex w-full items-end justify-end bg-gradient-to-b from-black/0 to-black/95 p-10 text-right">
                    <h3 className="w-2/3 text-xl font-semibold text-secondary md:text-3xl lg:text-4xl">
                      {featuredTitle}
                    </h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
