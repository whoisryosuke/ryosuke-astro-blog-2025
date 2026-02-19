import type { SelectedBlogData } from "../../../../data/selected-blogs";
import FileIcon from "../../../icons/FileIcon";

const SelectedBlogListItem = ({ title, url }: SelectedBlogData) => {
  console.log("urrl", url);
  return (
    <li className="SelectedBlogListItem">
      <a href={`/blog/${url}`}>
        <FileIcon />
        <h3>{title}</h3>
      </a>
    </li>
  );
};

export default SelectedBlogListItem;
