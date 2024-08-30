import "./Product.css";
const Products = ({ result }) => {
  return (
    <>
      <section style={{ gap: "1rem" }} className="card-container">
        {result}
      </section>
    </>
  );
};

export default Products;
