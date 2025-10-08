import type { SelectedBlogData } from "../../../../data/selected-blogs";
import FileIcon from "../../../icons/FileIcon";

const SelectedBlogListItem = ({ title, url }: SelectedBlogData) => {
  return (
    <li className="SelectedBlogListItem">
      <FileIcon />
      <a href={url}>
        <h3>{title}</h3>
      </a>
    </li>
  );
};

export default SelectedBlogListItem;
