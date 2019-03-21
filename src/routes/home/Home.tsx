import React from "react";
import { connect } from "react-redux";
import Loading from "~/components/loading";
import { changevalue, additem, deleteitem } from "~/actions/todolist";
import s from "./Home.scss";

// 创建类型接口
export interface IProps {
  inputValue: any;
  list: any[];
  onChangeValue: (e: any) => void;
  onAddItem: () => void;
  onDeleteItem: (index: number) => void;
}

class Home extends React.PureComponent<IProps> {
  public componentWillMount() {
    Loading.show();
    setTimeout(() => {
      Loading.hide();
    }, 3000);
  }

  public render() {
    const { inputValue, list, onAddItem } = this.props;
    return (
      <article>
        <input
          type="text"
          value={inputValue}
          onChange={this.handleChangeValue}
        />
        &emsp;&emsp;
        <button onClick={onAddItem}>提交</button>
        <ul>
          {list.map((item: any, index: number) => (
            <li key={index} onClick={this.handleDelteItem(index)}>
              {item}
            </li>
          ))}
        </ul>
      </article>
    );
  }

  private handleChangeValue = (e: any) => {
    const { onChangeValue } = this.props;
    onChangeValue(e.target.value);
  };

  private handleDelteItem = (i: number) => () => {
    const { onDeleteItem } = this.props;
    onDeleteItem(i);
  };
}

const mapStateToProps = (state: any) => ({
  inputValue: state.todoList.inputValue,
  list: [...state.todoList.list]
});

const mapDispatchToProps = (dispatch: any) => ({
  onChangeValue: (val: any) => dispatch(changevalue(val)),
  onAddItem: () => dispatch(additem()),
  onDeleteItem: (index: number) => dispatch(deleteitem(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
