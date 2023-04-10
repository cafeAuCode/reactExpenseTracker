import { useState } from "react";
import ExpenseFilter from "./components/expense-tracker/ExpenseFilter";
import Form from "../src/components/Form";
import ExpenseList from "./components/expense-tracker/components/ExpenseList";
import ExpandableText from "./components/ExpandableText";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "Rent", price: 1000, category: "Housing" },
    { id: 2, description: "Groceries", price: 200, category: "Food" },
    {
      id: 3,
      description: "Car Payment",
      price: 400,
      category: "Transportation",
    },
    { id: 4, description: "Phone Bill", price: 50, category: "Utilities" },
    { id: 5, description: "Internet", price: 70, category: "Utilities" },
    { id: 6, description: "Netflix", price: 15, category: "Entertainment" },
    { id: 7, description: "Gym", price: 30, category: "Entertainment" },
    { id: 8, description: "Eggs", price: 50, category: "Groceries" },
    { id: 9, description: "Toilet Paper", price: 100, category: "Groceries" },
    {
      id: 10,
      description: "Paper Towels",
      price: 10,
      category: "Groceries",
    },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-5">
        <Form
          onSubmit={(expense) =>
            console.log(
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            )
          }
        />
      </div>
      <div className="my-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e: any) => e.id !== id))}
      />
    </div>
  );
}

export default App;
