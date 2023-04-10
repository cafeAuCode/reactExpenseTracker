import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../components/expense-tracker/categories";

const schema = z.object({
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(50),
  price: z.number().min(0, "Price must be greater than 0").max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Please pick a valid category" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const Form = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  const onOptionsChangeHandler = (event: any) => {
    console.log("User selected: ", event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="Form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          {...register("price", {
            setValueAs: (value) => parseFloat(value),
          })}
          id="price"
          type="number"
          className="form-control"
        />
        {errors.price && (
          <p className="text-danger mt-1">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>

        <select
          {...register("category")}
          id="category"
          className="form-control form-select"
          aria-label="Default select example"
          onChange={onOptionsChangeHandler}
        >
          <option>Please choose one option</option>
          {categories.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>

        {errors.category && (
          <p className="text-danger mt-1">{errors.category.message}</p>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
