"use client";

import React, { useState, ReactNode } from "react";

export type Tab = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  content?: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  classNameContent?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultValue,
  onChange,
  className = "",
  classNameContent = "",
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultValue ?? tabs[0]?.value ?? ""
  );

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  const activeTabObj = tabs.find((tab) => tab.value === activeTab);

  return (
    <div className={className}>
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <div
            className={` ${
              activeTab === tab.value && "border-b-4 border-gray-700 "
            }`}
          >
            <button
              type="button"
              key={tab.value}
              className={`py-1 px-2 rounded-md font-medium text-md
              ${
                activeTab === tab.value
                  ? "bg-[#4D5358] text-[#B0B7BE] mb-4"
                  : "text-gray-400 hover:text-gray-100 mb-4"
              }
              transition-colors duration-200
            `}
              onClick={() => handleTabClick(tab.value)}
              aria-current={activeTab === tab.value ? "page" : undefined}
            >
              {tab.icon && (
                <span className="inline-block align-middle mr-1">
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          </div>
        ))}
      </div>
      <div className={`mt-4 ${classNameContent}`}>
        {activeTabObj && activeTabObj.content}
      </div>
    </div>
  );
};
