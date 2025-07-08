import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({ title, description, keywords }) => {
  const defaultTitle = "FormaFlow | Build Beautiful Forms in Minutes";
  const defaultDescription =
    "Create custom forms with our intuitive drag-and-drop form builder. No coding required.";
  const defaultKeywords =
    "form builder, survey tool, drag and drop forms, form creator, online forms";

  return (
    <Helmet>
      <title>{title ? `${title} | FormaFlow` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

export default SEO;
