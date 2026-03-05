import { UserRound } from 'lucide-react';

export function UserProfileSegment({ profiles }: {
    profiles: { title: string; description: string; forWho: string[] }[]
}) {
    return (
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map((profile, i) => (
                <div key={i} className="flex flex-col rounded-xl border bg-fd-card overflow-hidden">
                    <div className="flex items-center gap-3 bg-fd-secondary/50 px-4 py-3 border-b">
                        <div className="bg-brand/10 p-2 rounded-full hidden sm:block">
                            <UserRound className="size-4 text-brand" />
                        </div>
                        <div>
                            <h3 className="font-semibold m-0 text-fd-foreground">{profile.title}</h3>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-4 flex-1">
                        <p className="text-sm text-fd-muted-foreground m-0">{profile.description}</p>
                        <div className="mt-auto">
                            <span className="text-xs font-semibold uppercase tracking-wider text-fd-foreground/80 mb-2 block">Kimler İçin Uygun?</span>
                            <ul className="m-0 p-0 list-none space-y-1">
                                {profile.forWho.map((item, j) => (
                                    <li key={j} className="text-sm flex items-center gap-2 before:content-[''] before:block before:size-1.5 before:bg-brand before:rounded-full">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
