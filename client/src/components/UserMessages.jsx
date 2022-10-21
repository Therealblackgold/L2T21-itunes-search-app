// error and spinner loader inside conditional rendering, props error, isLoading, SPINNER

const UserMessages = ({ error, isLoading, SPINNER }) => {
  return (
    <div className="user-messages">
      {error && (
        <p className="bold">
          {error}
          <i className="bi bi-emoji-frown" style={{ marginLeft: "8px" }}></i>
        </p>
      )}
      {isLoading && (
        <p className="bold">
          <img style={{ width: "100px" }} src={SPINNER} alt="" />
        </p>
      )}
    </div>
  );
};

export default UserMessages;
