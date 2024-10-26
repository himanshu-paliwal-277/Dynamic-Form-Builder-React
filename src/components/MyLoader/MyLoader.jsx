import ContentLoader from "react-content-loader";

const MyLoader = () => (
    <ContentLoader
      height={13}
      speed={2}
      width="100%"
      backgroundColor={'#e5e7eb'}
      foregroundColor={'#00ff00'}
      viewBox="0 0 100% 13"
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="4" ry="4" width="100%" height="13" />
    </ContentLoader>
  )

  export default MyLoader;