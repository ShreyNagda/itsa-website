import React from "react";

interface SectionHeadingProps {
  title: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  // Define the color based on the status

  return (
    <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
      <div className="w-1 h-6 bg-primary rounded-full"></div>
      {title}
    </h2>
  );
};
