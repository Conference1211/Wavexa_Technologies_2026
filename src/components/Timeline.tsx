import { motion } from "framer-motion";
import { Badge } from "@/components/ui-kit";

export function Timeline({
  items,
}: {
  items: {
    title: string;
    speaker: string;
    type: string;
  }[];
}) {
  return (
    <div className="relative pl-6 sm:pl-8">
      <div className="absolute top-2 bottom-2 left-0 w-px [background-image:var(--gradient-brand)] opacity-45" />

      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative pb-8 last:pb-0"
        >
          <span
            className="
              absolute
              top-2
              -left-[1.6rem]
              h-3
              w-3
              rounded-full
              border-2
              border-background
              [background-image:var(--gradient-brand)]
              sm:-left-[2.1rem]
            "
          />

          <div
            className="
              glass
              gradient-border
              rounded-2xl
              px-5
              py-5
              transition-transform
              duration-300
              group-hover:translate-x-1.5
            "
          >
            <div
              className="
                grid
                grid-cols-[minmax(0,1fr)_auto]
                items-start
                gap-4
              "
            >
              <div className="min-w-0">

                {/* SESSION TITLE */}
                <h4
                  className="
                    text-xl
                    font-bold
                    leading-[1.08]
                    tracking-[-0.035em]
                    text-balance
                  "
                >
                  {item.title}
                </h4>

                {/* SPEAKER */}
                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-muted-foreground
                  "
                >
                  {item.speaker}
                </p>
              </div>

              {/* SESSION TYPE */}
              <Badge
                tone="muted"
                className="shrink-0"
              >
                {item.type}
              </Badge>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}