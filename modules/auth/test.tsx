const Parent = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <ChildComponent />
    <button>Click me!</button>
  );
};

// Child Component
const ChildComponent = ({ onClick }) => {
  const runMe += () => {
    console.log('runMe');
  }
  return (...)
}