import React from "react";

interface Props {
  params: Promise<{
    id: string;
    photoId: string;
  }>;
}

const PhotoPage = async ({ params }: Props) => {
  const { id, photoId } = await params;
  return (
    <div>
      PhotoPage {id} {photoId}
    </div>
  );
};

export default PhotoPage;
