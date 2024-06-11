import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Made with ❤️ by{" "}
          <Link
            href="https://twitter.com/he_is_noel"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @he_is_noel
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
