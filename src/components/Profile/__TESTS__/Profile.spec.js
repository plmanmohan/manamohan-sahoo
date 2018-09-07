import { Profile } from "../Profile";
import { PearsonUsers } from "../../PearsonUsers";
import { removeUser, removeDuplicateUsers } from "../../../utility/user-functions";


jest.mock('../../../utility/api.js');

describe('Test Profile component', () => {
  it('renders without crashing', () => {
    shallow(<profile />);
  });

  it("Render <profile/>", () => {
    const state = {
      users: [
        { id: 11, first_name: "George", last_name: "Edwards", avatar: "128.jpg" }
      ]
    };
    const wrapper = shallow(
      <Profile key={11} user={state.users[0]} onDelete={() => {}} />
    );
  
    const p = wrapper.find("p");
    expect(p.text()).toEqual("George Edwards");
  });

  it('calls onDelete event on click of delete button', () =>{
    const state = {
      users: [
        { id: 11, first_name: "George", last_name: "Edwards", avatar: "128.jpg" }
      ]
    };
    const onDelete = jest.fn();
    let wrapper = mount(<Profile key={11} user={state.users[0]} onDelete={onDelete} />);
    wrapper.find('button').simulate('click');
    expect(onDelete).toBeCalledWith(11)
  })
 });

