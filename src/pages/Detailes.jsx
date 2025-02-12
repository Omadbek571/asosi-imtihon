import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go"
import { FaRegTrashCan } from "react-icons/fa6"
import { useStore } from "../store/useStore"

function Detailes() {
  const { id } = useParams()
  const [detalData, setDetalData] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const { deleteCard, upCard, cards } = useStore()
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const [items, setItems] = useState([])

  useEffect(() => {
    const data = cards.find((val) => val.id === id)
    setDetalData(data)
    setEditData(data)
    setItems(data?.items || [])
  }, [id, cards])

  if (!detalData) {
    return <p>Loading...</p>
  }

  function handleDelete() {
    deleteCard(detalData.id)
    navigate("/")
  }

  function handlePaid() {
    upCard(detalData.id, { status: "paid" })
  }

  function addItemcard() {
    const newItem = { id: Date.now(), name: "", quantity: 0, price: 0, total: 0 }
    setItems((prevItems) => [...prevItems, newItem])
  }

  function delItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  function handleInputChange(e, field, nestedField = null) {
    const { value } = e.target
    if (nestedField) {
      setEditData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [nestedField]: value },
      }))
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }))
    }
  }
  

  function handleItemChange(e, id, field) {
    const { value } = e.target
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "quantity" || field === "price") {
            updatedItem.quantity = field === "quantity" ? Number(value) : item.quantity
            updatedItem.price = field === "price" ? Number(value) : item.price
            updatedItem.total = updatedItem.quantity * updatedItem.price
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  function handleSave() {
    const updatedData = {
      ...editData,
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
    }
    upCard(detalData.id, updatedData)
    setDetalData(updatedData)
    setEditOpen(false)
  }

  return (
    <div className="border-2 flex flex-col container mx-auto lg:w-[800px]">
      {editOpen && (
        <div className="p-2 border-2 absolute left-0 md:left-4 lg:left-20 h-[180vh] w-[45vh] md:w-[60vh] text-black bg-white rounded-md overflow-y-auto">
          <div className="font-bold flex gap-5 items-center cursor-pointer" onClick={() => setEditOpen(false)}>
            <GoChevronLeft />
            Go Back
          </div>
          <div className="font-bold mt-4 text-xl">
            Edit <span className="text-gray-500">#</span>
            {detalData.id}
          </div>

          <div className="mt-6">
            <h3 className="text-purple-500 font-bold">Bill From</h3>
          </div>
          <div className="flex flex-col mt-4 gap-2 mx-auto">
            <label className="text-gray-500 font-semibold" htmlFor="streetAddress">
              Street Address
            </label>
            <input
              id="streetAddress"
              type="text"
              value={editData.senderAddress?.street || ""}
              onChange={(e) => handleInputChange(e, "senderAddress", "street")}
              className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-42">
              <label className="text-gray-500 font-semibold" htmlFor="city">
                City
              </label>
              <input
                id="city"
                type="text"
                value={editData.senderAddress?.city || ""}
                onChange={(e) => handleInputChange(e, "senderAddress", "city")}
                className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 w-42">
              <label className="text-gray-500 font-semibold" htmlFor="postCode">
                Post Code
              </label>
              <input
                id="postCode"
                type="text"
                value={editData.senderAddress?.postCode || ""}
                onChange={(e) => handleInputChange(e, "senderAddress", "postCode")}
                className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-500 font-semibold" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              type="text"
              value={editData.senderAddress?.country || ""}
              onChange={(e) => handleInputChange(e, "senderAddress", "country")}
              className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
            />
          </div>

          <div className="py-8 pb-8">
            <h3 className="text-purple-500 font-bold">Bill To</h3>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-500 font-semibold" htmlFor="clientName">
              Client's Name
            </label>
            <input
              id="clientName"
              type="text"
              value={editData.clientName || ""}
              onChange={(e) => handleInputChange(e, "clientName")}
              className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex mt-3 flex-col gap-2 w-full">
            <label className="text-gray-500 font-semibold" htmlFor="clientEmail">
              Client’s Email
            </label>
            <input
              id="clientEmail"
              type="text"
              value={editData.clientEmail || ""}
              onChange={(e) => handleInputChange(e, "clientEmail")}
              className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex mt-3 flex-col gap-2 w-full">
            <label className="text-gray-500 font-semibold" htmlFor="streetAddress">
              Street Address
            </label>
            <input
              id="streetAddress"
              type="text"
              value={editData.clientAddress?.street || ""}
              onChange={(e) => handleInputChange(e, "clientAddress", "street")}
              className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <div className="flex flex-col gap-2 w-42">
              <label className="text-gray-500 font-semibold" htmlFor="city">
                City
              </label>
              <input
                id="city"
                type="text"
                value={editData.clientAddress?.city || ""}
                onChange={(e) => handleInputChange(e, "clientAddress", "city")}
                className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 w-42">
              <label className="text-gray-500 font-semibold" htmlFor="postCode">
                Post Code
              </label>
              <input
                id="postCode"
                type="text"
                value={editData.clientAddress?.postCode || ""}
                onChange={(e) => handleInputChange(e, "clientAddress", "postCode")}
                className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex mt-3 flex-col gap-2 w-full">
            <label className="text-gray-500 font-semibold" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              type="text"
              value={editData.clientAddress?.country || ""}
              onChange={(e) => handleInputChange(e, "clientAddress", "country")}
              className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex mt-3 flex-col gap-2 w-full">
            <label className="text-gray-500 font-semibold" htmlFor="invoiceDate">
              Invoice Date
            </label>
            <input
              id="invoiceDate"
              type="date"
              value={editData.createdAt || ""}
              onChange={(e) => handleInputChange(e, "createdAt")}
              className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
            />
          </div>
          <select
            id="paymentTerms"
            value={Number(editData.paymentTerms) || 1}
            onChange={(e) => handleInputChange(e, "paymentTerms")}
            className="w-full py-2 mt-3 px-4 border-[.2px] rounded-lg focus:outline-none border-gray-300 focus:outline-purple-400"
          >
            <option value="1">Next 1 day</option>
            <option value="7">Next 7 days</option>
            <option value="14">Next 14 days</option>
            <option value="30">Next 30 days</option>
          </select>

          <div className="flex mt-3 flex-col gap-2 w-full">
            <label className="text-gray-500 font-semibold" htmlFor="projectDescription">
              Project Description
            </label>
            <input
              id="projectDescription"
              type="text"
              value={editData.projectDescription || ""}
              onChange={(e) => handleInputChange(e, "projectDescription")}
              className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
            />
          </div>
          <div>
            {items.map((item, index) => (
              <div key={index}>
                <div className="py-5 px-2">
                  <h3 className="font-bold text-2xl text-gray-500">Item List</h3>
                  <div className="flex flex-col gap-2 mt-4 mx-auto">
                    <label className="text-gray-400 font-light" htmlFor={`itemName-${item.id}`}>
                      Item Name
                    </label>
                    <input
                      id={`itemName-${item.id}`}
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(e, item.id, "name")}
                      className="py-2 px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex flex-col gap-2 items-center w-1/4">
                    <label className="text-gray-400 font-light" htmlFor={`qty-${item.id}`}>
                      Qty.
                    </label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(e, item.id, "quantity")}
                      className="py-2 w-full px-4 border-2 rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-center w-1/4">
                    <label className="text-gray-400 font-light" htmlFor={`price-${item.id}`}>
                      Price
                    </label>
                    <input
                      id={`price-${item.id}`}
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(e, item.id, "price")}
                      className="py-2 w-full px-4 border-2 rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="w-1/6 flex justify-center p-2">
                    <FaRegTrashCan className="text-gray-500 mt-8 cursor-pointer" onClick={() => delItem(item.id)} />
                  </div>
                </div>
              </div>
            ))}
            <div
              className="text-[#7E88C3] bg-gray-200 p-3 text-center rounded-3xl mt-14 cursor-pointer"
              onClick={addItemcard}
            >
              + Add New Item
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button className="py-2 px-4 bg-gray-300 rounded-full" onClick={() => setEditOpen(false)}>
              Cancel
            </button>
            <button className="py-2 px-4 bg-purple-500 text-white rounded-full" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-5 p-5" onClick={() => navigate("/")}>
        <div className="text-purple-500">
          <GoChevronLeft />
        </div>
        <h3 className="cursor-pointer">
          <b>Go back</b>
        </h3>
      </div>

      <div className="flex flex-col shadow-2xl w-[95%] mx-auto md:flex-row justify-between items-center p-8 rounded-md">
        <div className="flex items-center gap-3 justify-between w-full md:w-auto">
          <h2 className="text-gray-400">Status</h2>
          <div
            className={`px-3 py-2 rounded-md flex items-center gap-2
                ${
                  detalData.status === "paid"
                    ? "bg-green-100 text-green-500"
                    : detalData.status === "pending"
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-gray-200 text-black"
                }`}
          >
            <span
              className={`w-3 h-3 rounded-full 
                  ${
                    detalData.status === "paid"
                      ? "bg-green-500"
                      : detalData.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  }`}
            ></span>
            {detalData.status}
          </div>
        </div>

        <div className="hidden md:flex gap-2">
          <button
            className="py-2 bg-gray-100 text-gray-600 font-bold px-4 rounded-4xl"
            onClick={() => setEditOpen(true)}
          >
            Edit
          </button>
          <button className="py-2 px-4 bg-red-400 font-bold text-white rounded-4xl" onClick={() => setOpenModal(true)}>
            Delete
          </button>
          {detalData.status !== "paid" ? (
            <button className="py-2 px-4 bg-[#7C5DFA] text-white font-bold border-2 rounded-4xl" onClick={handlePaid}>
              Mark as Paid
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className=" mt-4 rounded-lg w-[95%] mx-auto  px-6 py-6 ">
        <div className="md:justify-between flex flex-col md:flex-row">
          <div>
            <h1 className="text-gray-500 font-bold">
              #<span className="text-black">{detalData.id}</span>
            </h1>
            <p className="text-gray-600">{detalData.clientName}</p>
          </div>
          <div className="text-gray-400">
            <p>{detalData.clientAddress.street}</p>
            <p>{detalData.clientAddress.city}</p>
            <p>{detalData.clientAddress.postCode}</p>
            <p>{detalData.clientAddress.country}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <p className="font-semibold text-gray-500">Inv oice Date</p>
              <h2 className="font-bold text-xl">{detalData.createdAt}</h2>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Payment Due</p>
              <h2 className="font-bold text-xl">{detalData.paymentDue}</h2>
            </div>
          </div>
          <div>
            <p className="font-semibold mt-12 items-center text-gray-500">Bill To</p>
            <h2 className="font-bold text-xl">{detalData.clientName}</h2>
            <div className="text-gray-400">
              <p>{detalData.clientAddress.street}</p>
              <p>{detalData.clientAddress.city}</p>
              <p>{detalData.clientAddress.postCode}</p>
              <p>{detalData.clientAddress.country}</p>
            </div>
          </div>
        </div>

        <div className="">
          <p className="font-semibold text-gray-500">Sent to</p>
          <h2 className="font-bold text-xl">{detalData.clientEmail}</h2>
        </div>
        <div className="flex bg-[#F9FAFE] items-center justify-between p-8 rounded-3xl mt-2">
          {detalData.items.map((item, index) => (
            <div key={index}>
              <div className="">
                <h2 className="font-bold text-xl">{item.name}</h2>
                <h3 className="text-gray-500 text-xl font-bold">£ {item.price}</h3>
              </div>
              <div className="font-bold text-xl">£ {item.total}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-8 px-8 bg-[#373B53] rounded-b-xl text-white flex items-center justify-between">
        <h2 className="font-bold text-xl">Grand Total</h2>
        <h2 className="font-bold text-3xl">£ {detalData.total}</h2>
      </div>
      <div className="p-4 flex gap-8 md:hidden">
        <button className="py-2 bg-gray-100 text-gray-600 font-bold px-4 rounded-4xl" onClick={() => setEditOpen(true)}>
          Edit
        </button>
        <button className="py-2 px-4 bg-red-400 font-bold text-white rounded-4xl" onClick={() => setOpenModal(true)}>
          Delete
        </button>
        {detalData.status !== "paid" ? (
          <button className="py-2 px-4 bg-[#7C5DFA] text-white font-bold border-2 rounded-4xl" onClick={handlePaid}>
            Mark as Paid
          </button>
        ) : null}
      </div>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className=" w-96 h-56 bg-white p-6 rounded-lg shadow-2xl">
            <h2 className="text-xl font-bold">Confirm Deletion</h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete invoice #{detalData.id}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button className="px-4 py-2 bg-gray-300 rounded-3xl" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-3xl" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Detailes

