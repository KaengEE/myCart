import "./Navbar.css";
import rocket from "../../assets/rocket.png";

const Navbar = () => {
  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">myCart</h1>
        {/* 검색창 */}
        <form className="align_center navbar_form">
          <input
            type="text"
            className="navbar_search"
            placeholder="제품 찾기..."
          />
          <button type="submit" className="search_button">
            검색하기
          </button>
        </form>
      </div>
      {/* 메뉴들 */}
      <div className="align_center navbar_links">
        <a href="#" className="align_center">
          Home <img src={rocket} alt="" className="link_emoji" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
