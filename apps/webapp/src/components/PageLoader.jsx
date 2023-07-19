import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const PageLoader = () => {
  return (
    <div className="page-loader">
      <ClipLoader color={"#123abc"} loading={true} css={override} size={150} />
    </div>
  );
};

export default PageLoader;
