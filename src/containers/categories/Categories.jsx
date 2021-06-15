import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesSelector,
  createCategoriesRequest,
  getCategoriesRequest,
} from "../../reducers/categories";

const Categories = () => {
  const [value, setValue] = useState("");
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCategoriesRequest());
  }, [getCategoriesRequest, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title: value };
    dispatch(createCategoriesRequest(data));
    setValue("");
  };

  return (
    <div>
      {categories.map((category) => (
        <h1 key={category.id}>{category.title}</h1>
      ))}
      <main>
        <h3>New category</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={({ target: { value } }) => {
              setValue(value);
            }}
          />
        </form>
      </main>
    </div>
  );
};

export default Categories;
