import { ChevronDown } from "lucide-react";

function DropDown() {
  return (
    <div className="flex items-center max-w-7xl mx-auto justify-between gap-4">
      {/* Левый блок */}
      <div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost m-1 group">
            Category
            <ChevronDown className="text-slate-400 size-4" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <label className="label cursor-pointer">
                <span className="label-text">Tees</span>
                <input type="checkbox" className="checkbox checkbox-sm" />
              </label>
            </li>
            <li>
              <label className="label cursor-pointer">
                <span className="label-text">Crewnecks</span>
                <input type="checkbox" className="checkbox checkbox-sm" />
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* Правый блок */}
      <div className="flex gap-2">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost m-1">
            Sort
            <ChevronDown className="text-slate-400 size-4" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <a>Newest</a>
            </li>
            <li>
              <a>Price: Low → High</a>
            </li>
            <li>
              <a>Price: High → Low</a>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost m-1">
            Brand
            <ChevronDown className="text-slate-400 size-4 " />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <a>Nike</a>
            </li>
            <li>
              <a>Adidas</a>
            </li>
            <li>
              <a>Puma</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
