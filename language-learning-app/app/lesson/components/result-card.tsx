type Props = {
  value: number;
  variant: "points" | "hearts";
};

const ResultCard = ({ value, variant }: Props) => {
  return <div>{variant}</div>;
};

export default ResultCard;
