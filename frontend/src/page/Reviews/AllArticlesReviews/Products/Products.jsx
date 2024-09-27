import "./Product.css";
const Products = ({ result }) => {
  return (
    <>
      <section
        style={{ gap: "1rem", wordBreak: "break-word" }}
        className="card-container"
      >
        {result}
      </section>
    </>
  );
};

export default Products;
