import { FeedWrapper, StickyWrapper } from "@/components/shared";
import React from "react";
import { Header } from "./components";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>My Sticky sidebar</StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
