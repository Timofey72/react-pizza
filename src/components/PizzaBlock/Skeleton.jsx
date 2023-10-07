import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="269" rx="10" ry="10" width="280" height="27" /> 
    <circle cx="140" cy="120" r="120" /> 
    <rect x="0" y="309" rx="10" ry="10" width="280" height="88" /> 
    <rect x="127" y="405" rx="15" ry="15" width="152" height="45" /> 
    <rect x="6" y="413" rx="10" ry="10" width="80" height="30" />
  </ContentLoader>
)

export default PizzaSkeleton

