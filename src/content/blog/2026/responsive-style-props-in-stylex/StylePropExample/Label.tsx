const Label = (props: any) => {
  return (
    <label
      style={{
        fontSize: "var(--font-size-6)",
        color: "var(--color-gray-300)",
        fontFamily: "var(--font-family-mono)",
        margin: 0,
        padding: 0,
      }}
      {...props}
    />
  );
};

export default Label;
