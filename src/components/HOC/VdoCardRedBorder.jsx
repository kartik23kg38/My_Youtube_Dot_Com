const VdoCardRedBorder = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="vdo-card-border border-4 border-red-500">
        <WrappedComponent {...props} />
      </div>
    );
  };
};
export default VdoCardRedBorder;

const vdoCardPurpleBorder = () => {
  return (props) => {
    return (
      <div className="vdo-card-border border-4 border-purple-500">
        <WrappedComponent {...props} />
      </div>
    );
  }

}
