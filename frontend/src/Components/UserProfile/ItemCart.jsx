import React from "react";

const ItemCart = ({ item, navigate, baseUrl, fetchLoggdIn, toast, token }) => {
  const deleteHander = async (item) => {
    // e.preventDefault()
    const confirmation = confirm("You want to delete this item?");
    if (!confirmation) {
      return;
    }

    const res = await fetch(
      `${baseUrl}/${
        item.type == "lost" ? "lostApplications" : "foundApplications"
      }/${item._id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      fetchLoggdIn();
    } else {
      toast.error(data.message);
    }
  };

  const editHandler = (item) => {
    navigate(
      `/item/${item.type == "lost" ? "lost-report" : "found-report"}/edit/${
        item._id
      }`
    );
  };

  return (
    <div className="item-card bg-white border border-gray-200 rounded-lg p-4 relative">
      <span className="badge badge-found capitalize "> {item.type} </span>
      <div className="flex">
        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-4 flex-shrink-0">
          <img
            src={`${baseUrl}/images/${item.type == "lost" ? "lost" : "found"}/${
              item.images[0]
            }`}
            className="w-full h-full"
            alt={item.title}
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-500 mb-2">
            Found at {item.location.state}, {item.location.city}
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {new Date(
              item.type == "lost" ? item.dateLost : item.dateFound
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-between  ">
        <button
          onClick={() => editHandler(item)}
          className="text-xs bg-[var(--celadon)] text-[var(--brunswick-green)] px-3 py-1 rounded-full hover:bg-[var(--celadon-2)] transition"
        >
          Edit
        </button>
        <button
          onClick={() => deleteHander(item)}
          className="text-xs bg-red-200 text-red-900 px-3 py-1 rounded-full hover:bg-red-300 transition"
        >
          Delete
        </button>
        <button
          onClick={() => {
            navigate(`/browse/${item._id}`);
          }}
          className="text-xs bg-[var(--celadon)] text-[var(--brunswick-green)] px-3 py-1 rounded-full hover:bg-[var(--celadon-2)] transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ItemCart;
