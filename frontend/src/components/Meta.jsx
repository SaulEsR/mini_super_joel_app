import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Bienvenido a MINI SUPER JOEL',
  description: 'Donde se vende los mejores productos al mejor precio',
  keywords: 'comprar productos, barato, calidad',
};

export default Meta;
