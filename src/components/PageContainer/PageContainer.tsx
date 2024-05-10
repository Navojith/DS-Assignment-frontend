interface Props {
  children: any;
  fullHeight?: boolean;
  justifyContentCenter?: boolean;
  alignItemsCenter?: boolean;
}

const PageContainer = ({
  children,
  fullHeight = true,
  justifyContentCenter = false,
  alignItemsCenter = false,
}: Props) => {
  return (
    <div
      className={`container mx-auto pt-10 ${
        justifyContentCenter ? "flex justify-center" : ""
      } ${alignItemsCenter ? "flex items-center" : ""}`}
      style={{ minHeight: fullHeight ? "calc(100vh - 68px)" : "" }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
