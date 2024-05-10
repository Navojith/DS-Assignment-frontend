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
      className={`mx-[10%] sm:mx-[10%] md:mx-[15%] lg:mx-[20%] pt-14 ${
        justifyContentCenter ? 'flex justify-center' : ''
      } ${alignItemsCenter ? 'flex items-center' : ''}`}
      style={{ minHeight: fullHeight ? 'calc(100vh - 70px)' : '' }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
