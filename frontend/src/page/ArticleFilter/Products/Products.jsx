import "./Product.css";
const Products = ({ result }) => {
  return (
    <>
      <section
        style={{
          gap: "1rem",
          direction: document.documentElement.dir === "rtl" ? "ltr" : "ltr",
        }}
        className="card-container"
      >
        {result}
      </section>
    </>
  );
};

export default Products;
