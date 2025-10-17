import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        {title}
      </h2>
      {subtitle ? (
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      ) : null}
    </div>
  );
};
