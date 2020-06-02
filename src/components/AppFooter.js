import React from "react";
function AppFooter(props) {
  return (
    <footer className="footer">
      <div className="btn-group">
        <button className="btn-footer" onClick={props.reset}>
          RESET
        </button>
        <span>/</span>
        <button className="btn-footer" onClick={props.loadSampleTodos}>
          LOAD SAMPLES
        </button>
        <span>/</span>
        <a href="mailto:natetpe+focuson@gmail.com">
          <button className="btn-footer">CONTACT ME</button>
        </a>
      </div>
      <p className="copyright">© 2020 Focus on...</p>
    </footer>
  );
}
export default AppFooter;
