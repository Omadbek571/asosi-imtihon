import { useEffect, useRef, useState } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import bgImg from "../images/bgImg.png"
import { useNavigate } from "react-router-dom"
import { useStore } from "../store/useStore"
import { GoChevronLeft } from "react-icons/go"
import { FaRegTrashCan } from "react-icons/fa6"

function Home() {
  const navigate = useNavigate()
  const { cards, addCard } = useStore()

  const [driwer, setDriwer] = useState(true)
  const [items, setItems] = useState([{ id: 1, name: "", qty: "", price: "" }])
  const [formData, setFormData] = useState({})
  const [selectFilter, setSelectFilter] = useState("");
  const [filterData, setFilterData] = useState([]);

  // Form input useRef()
  const stretRef = useRef()
  const cityRef = useRef()
  const postRef = useRef()
  const countRef = useRef()
  const cliantNameRef = useRef()
  const cliantEmailRef = useRef()
  const stretAdresRef = useRef()
  const youCityRef = useRef()
  const youpostCodeRef = useRef()
  const youCountRef = useRef()
  const dataRef = useRef()
  const selectRef = useRef()
  const descRef = useRef()

  const idGeneratorFn = () => `XM-${Math.random().toString(36).substring(2, 6).toUpperCase()}`


  useEffect(() => {
    if (selectFilter) {
      const filteredData = cards.filter((value) =>
        value.status.toLowerCase() === selectFilter.toLowerCase()
      );
      setFilterData(filteredData);
    } else {
      setFilterData(cards);
    }
  }, [selectFilter, cards]);


  function handleForm(e) {
    const { id, value } = e.target
    setFormData({ [id]: value })
  }
  // valitation
  function validation() {
    if (stretRef.current.value.trim() < 3) {
      stretRef.current.focus()
      stretRef.current.style.outlineColor = "red";
      return false
    }
    if (cityRef.current.value.trim() < 3) {
      cityRef.current.focus()
      cityRef.current.style.outlineColor = "red";
      return false
    }
    if (postRef.current.value.trim() < 1) {
      postRef.current.focus()
      postRef.current.style.outlineColor = "red";
      return false
    }
    if (countRef.current.value.trim() < 1) {
      countRef.current.focus()
      countRef.current.style.outlineColor = "red";
      return false
    }
    if (cliantNameRef.current.value.trim() < 3) {
      cliantNameRef.current.focus()
      cliantNameRef.current.style.outlineColor = "red";
      return false
    }
    if (cliantEmailRef.current.value.trim() < 3) {
      cliantEmailRef.current.focus()
      cliantEmailRef.current.style.outlineColor = "red";
      return false
    }
    if (stretAdresRef.current.value.trim() < 2) {
      stretAdresRef.current.focus()
      stretAdresRef.current.style.outlineColor = "red";
      return false
    }
    if (youCityRef.current.value.trim() < 3) {
      youCityRef.current.focus()
      youCityRef.current.style.outlineColor = "red";
      return false
    }
    if (youpostCodeRef.current.value.trim() < 1) {
      youpostCodeRef.current.focus()
      youpostCodeRef.current.style.outlineColor = "red";
      return false
    }
    if (youCountRef.current.value.trim() < 1) {
      youCountRef.current.focus()
      youCountRef.current.style.outlineColor = "red";
      return false
    }
    if (dataRef.current.value.trim() < 1) {
      dataRef.current.focus()
      dataRef.current.style.outlineColor = "red";
      return false
    }
    if (selectRef.current.value.trim() < 1) {
      selectRef.current.focus()
      selectRef.current.style.outlineColor = "red";
      return false
    }
    if (descRef.current.value.trim() < 1) {
      descRef.current.focus()
      descRef.current.style.outlineColor = "red";
      return false
    }

    return true

  }
  function handleSave(e) {
    e.preventDefault()

    const isValid = validation()
    if (!isValid) return;

    const updatedItems = items.map((item) => {
      const name = e.target[`itemName-${item.id}`].value
      const qty = Number(e.target[`qty-${item.id}`].value) || 1
      const price = Number(e.target[`price-${item.id}`].value) || 0

      return {
        name,
        quantity: qty,
        price,
        total: qty * price,
      }
    })
    const userData = {
      id: idGeneratorFn(),
      createdAt: new Date().toISOString().split("T")[0],
      paymentDue: dataRef.current.value,
      description: descRef.current.value,
      paymentTerms: Number(selectRef.current.value),
      status: "pending",
      senderAddress: {
        street: stretRef.current.value,
        city: cityRef.current.value,
        postCode: postRef.current.value,
        country: countRef.current.value,
      },
      clientAddress: {
        street: stretAdresRef.current.value,
        city: youCityRef.current.value,
        postCode: youpostCodeRef.current.value,
        country: youCountRef.current.value,
      },
      items: updatedItems,
      total: updatedItems.reduce((acc, item) => acc + item.total, 0),
    }

    addCard(userData)
    setDriwer(true)
    setItems([{ id: 1, name: "", qty: "", price: "" }])
  }

  function handleDraft(e) {
    e.preventDefault()

    const form = e.target.closest("form")
    if (!form) return

    const updatedItems = items.map((item) => {
      const name = form[`itemName-${item.id}`]?.value || ""
      const qty = Number(form[`qty-${item.id}`]?.value) || 1
      const price = Number(form[`price-${item.id}`]?.value) || 0

      return {
        name,
        quantity: qty,
        price,
        total: qty * price,
      }
    })

    const userData = {
      id: idGeneratorFn(),
      createdAt: new Date().toISOString().split("T")[0],
      paymentDue: dataRef.current.value,
      description: descRef.current.value,
      paymentTerms: Number(selectRef.current.value),
      status: "draft",
      senderAddress: {
        street: stretRef.current.value,
        city: cityRef.current.value,
        postCode: postRef.current.value,
        country: countRef.current.value,
      },
      clientAddress: {
        street: stretAdresRef.current.value,
        city: youCityRef.current.value,
        postCode: youpostCodeRef.current.value,
        country: youCountRef.current.value,
      },
      items: updatedItems,
      total: updatedItems.reduce((acc, item) => acc + item.total, 0),
    }

    addCard(userData)
    setDriwer(true)
    setItems([{ id: 1, name: "", qty: "", price: "" }])
  }

  function addItemcard() {
    const newItem = { id: Date.now(), name: "", qty: "", price: "" }
    setItems([...items, newItem])
  }

  function delItem(id) {
    const upItem = items.filter((item) => item.id !== id)
    setItems(upItem)
  }  


  return (
    <div className="lg:flex lg:justify-center md:ml-2 mt-12">
      <div className="gap-2 relative flex flex-col items-center w-[100%] lg:whitespace-nowrap lg:w-[45rem] ">
        <div className="flex items-center w-[90%] justify-between lg:w-[95%] md:w-[95%]">
          <div>
            <h2 className="font-bold dark:text-white">Invoices</h2>
            <h3 className="text-gray-400">{filterData.length} invoices</h3>
          </div>
          <div className="flex items-center gap-2">
            {/* <Filter /> */}
            <select
              onChange={(e) => setSelectFilter(e.target.value)}
              className="p-2 bg-[#33d69f0f] text-black font-semibold rounded-md 
               dark:bg-[#1e1e2f] dark:text-white border border-gray-300 dark:border-gray-600"
            >
              <option value="">Filter by status</option>
              <option value="Paid">Paid</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
            </select>

            {/* <Filter /> */}
            <button
              onClick={() => setDriwer(false)}
              className={`
                  md:p-3 text-white p-4  rounded-full bg-purple-500 font-bold flex items-center gap-2`}
            >
              <span className="md:h-8 md:w-8 h-4 w-4 rounded-full bg-white text-purple-600 flex items-center justify-center">
                +
              </span>
              New <span className="hidden sm:block"> Invoice</span>
            </button>
          </div>
        </div>
        {!driwer && (
          <div className="absolute border-2 p-2 h-[135vh] dark:bg-[#141625] rounded-md bg-white lg:left-[-330px]  lg:h-[800px] md:h-[90vh] left-[-2px] top-[-8px] w-[98%] md:w-[70%] overflow-auto break-words">
            <div className="flex dark:text-white  items-center font-bold gap-3 cursor-pointer" onClick={() => setDriwer(true)}>
              <GoChevronLeft />
              <span className="">Go back</span>
            </div>
            <div className="font-bold text-2xl mt-4 dark:text-white">New Invoice</div>

            <p className="text-purple-500 font-bold py-8 pb-4">Bill From</p>

            <div className="flex flex-col gap-2 mx-auto">
              <label className="text-gray-400 font-light" htmlFor="streetAddress">
                Street Address
              </label>
              <input
                ref={stretRef}
                id="streetAddress"
                type="text"
                className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 mx-auto mt-4">
              <div className="flex-col w-[50%] flex justify-between">
                <label className="text-gray-400 font-light" htmlFor="city">
                  City
                </label>
                <input
                  ref={cityRef}
                  id="city"
                  type="text"
                  className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                />
              </div>
              <div className="flex w-28 md:w-full flex-col gap-3">
                <label className="text-gray-400 font-light" htmlFor="postCode">
                  Post Code
                </label>
                <input
                  ref={postRef}
                  id="postCode"
                  type="number"
                  className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col mt-4 gap-3">
              <label className="text-gray-400 font-light" htmlFor="country">
                Country
              </label>
              <input
                ref={countRef}
                id="country"
                type="text"
                className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>

            <h3 className="text-purple-500 py-8 pb-2">Bill To</h3>

            <div className="flex flex-col mt-4 gap-3">
              <label className="text-gray-400 font-light" htmlFor="clientName">
                Client’s Name
              </label>
              <input
                ref={cliantNameRef}
                id="clientName"
                type="text"
                className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>

            <div className="flex flex-col mt-4 gap-3">
              <label className="text-gray-400 font-light" htmlFor="clientEmail">
                Client’s Email
              </label>
              <input
                ref={cliantEmailRef}
                id="clientEmail"
                type="email"
                className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>

            <div className="flex flex-col mt-4 gap-3">
              <label className="text-gray-400 font-light" htmlFor="clientStreet">
                Street Address
              </label>
              <input
                ref={stretAdresRef}
                id="clientStreet"
                type="text"
                className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 mx-auto mt-4">
              <div className="flex-col w-[50%] flex justify-between">
                <label className="text-gray-400 font-light" htmlFor="clientCity">
                  City
                </label>
                <input
                  ref={youCityRef}
                  id="clientCity"
                  type="text"
                  className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                />
              </div>
              <div className="flex w-28 md:w-full flex-col gap-3">
                <label className="text-gray-400 font-light" htmlFor="clientPostCode">
                  Post Code
                </label>
                <input
                  ref={youpostCodeRef}
                  id="clientPostCode"
                  type="number"
                  className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col mt-4 gap-3">
              <label className="text-gray-400 font-light" htmlFor="clientCountry">
                Country
              </label>
              <input
                ref={youCountRef}
                id="clientCountry"
                type="text"
                className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>

            <div className="flex flex-col mt-4 gap-3">
              <label className="text-gray-400 font-light" htmlFor="invoiceDate">
                Invoice Date
              </label>
              <input
                ref={dataRef}
                id="invoiceDate"
                type="date"
                className="py-2 px-4 dark:text-white border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>

            <div className="flex flex-col mt-4 gap-3">
              <label className="text-gray-400 font-light" htmlFor="paymentTerms">
                Payment Terms
              </label>
              <select
                defaultValue={1}
                ref={selectRef}
                id="paymentTerms"
                className="appearance-none w-full py-2 px-4 border rounded-lg 
               focus:outline-none border-gray-300 focus:ring-2 focus:ring-purple-400 
               bg-white text-black dark:bg-[#1e1e2f] dark:text-white dark:border-gray-600"
              >
                <option value="1">Next 1 day</option>
                <option value="7">Next 7 days</option>
                <option value="14">Next 14 days</option>
                <option value="30">Next 30 days</option>
              </select>

            </div>

            <div className="flex flex-col mt-4 gap-3">
              <label className="text-gray-400 font-light" htmlFor="projectDescription">
                Project Description
              </label>
              <input
                ref={descRef}
                id="projectDescription"
                type="text"
                className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
              />
            </div>

            <form onChange={handleForm} onSubmit={handleSave}>
              <div>
                {items.map((item) => (
                  <div key={item.id}>
                    <div className="py-5 px-2">
                      <h3 className="font-bold text-2xl text-gray-500">Item List</h3>
                      <div className="flex flex-col gap-2 mt-4 mx-auto">
                        <label className="text-gray-400 font-light" htmlFor={`itemName-${item.id}`}>
                          Item Name
                        </label>
                        <input
                          id={`itemName-${item.id}`}
                          type="text"
                          className="py-2 dark:text-white px-4 border-[2px] rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full gap-4">
                      <div className="flex flex-col gap-2 items-center w-1/4">
                        <label className="text-gray-400 font-light" htmlFor={`qty-${items[0].qty}`}>
                          Qty.
                        </label>
                        <input
                          id={`qty-${item.total}`}
                          type="number"
                          className="py-2 dark:text-white w-full px-4 border-2 rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2 items-center w-1/4">
                        <label className="text-gray-400 font-light" htmlFor={`price-${item.id}`}>
                          Price
                        </label>
                        <input
                          id={`price-${item.id}`}
                          type="number"
                          className="py-2 dark:text-white w-full px-4 border-2 rounded-lg focus:border-purple-500 border-gray-300 focus:outline-none"
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

              <div className="shadow-2xl rounded-md p-5 mt-20 flex justify-between font-bold">
                <button className="p-3 rounded-3xl bg-[#F9FAFE] text-[#7E88C3]" onClick={() => setDriwer(true)}>
                  Discard
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDraft(e)}
                  className="p-3 border rounded-3xl bg-[#373B53] text-[#888EB0]"
                >
                  <span className="hidden md:block">Save as Draft</span>
                  <span className="md:hidden">Draft</span>
                </button>

                <button type="submit" className="p-3 border rounded-3xl bg-[#7C5DFA] text-white">
                  <span className="hidden md:block">Save & Send</span>
                  <span className="md:hidden">Save</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {filterData.length > 0 ? (
          <div className="gap-5 flex flex-col">
            {filterData.map((value, index) => (
              <div
                onClick={() => navigate(`/detailes/${value.id}`)}
                key={index}
                className="shadow-lg dark: mt-4 dark:bg-[#1e2139] hover:border-purple-500 hover:border flex items-center gap-5 justify-between rounded-md p-4 w-full max-w-[850px]"
              >
                <div className="flex flex-col md:flex-row md:gap-10 lg:gap-20">
                  <h2 className="text-gray-400">
                    #<span className="text-black font-bold dark:text-white">{value.id}</span>
                  </h2>
                  <h2 className="text-gray-400 whitespace-nowrap">Due {value.paymentDue}</h2>
                  <h2 className="dark:text-white">
                    £ <b>{value.items[0].price}</b>
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <h3 className="text-gray-400 whitespace-nowrap ">{value.clientName}</h3>
                  <div className="flex justify-between items-center gap-2">
                    <div
                      className={`flex items-center w-24  gap-2 px-3 py-2 rounded-md text-sm text-center
                                                  ${value.status === "paid"
                          ? "bg-[#33d69f0f] text-green-500"
                          : value.status === "pending"
                            ? "bg-[#ff8f000f] text-yellow-500"
                            : "bg-gray-200 text-black"
                        }`}
                    >
                      <span className="w-2 h-2 bg-current rounded-full" />
                      <span>{value.status.charAt(0).toUpperCase() + value.status.slice(1)}</span>
                    </div>
                    <div className="hidden md:block text-purple-500 ">
                      <MdArrowForwardIos />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <img className="mt-44" src={bgImg || "/placeholder.svg"} alt="No invoices found" />
            <p className="text-center mt-4 text-gray-500">No invoices found. Try adjusting your filter or add a new invoice.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
