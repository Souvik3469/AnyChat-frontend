import avatar from "../assets/avatar.jpg";
const Chat1 = () => {
  return (
    <div className="flex">
      <div className=" flex flex-col  fixed m-4 w-24 h-[95%] bg-[#1A66FF] rounded-lg items-end justify-around">
        <div className="m-6">
          <img src={avatar} className="w-12 h-12 rounded-full" />
        </div>
        <div className="">
          <div className="pl-3 pr-8 py-3 hover:border-r-2 border-r-[#FFE81A] rounded-s-lg hover:bg-[#004BE1]">
            Icons
          </div>
          <div className="pl-3 pr-8 py-3 hover:border-r-2 border-r-[#FFE81A] rounded-s-lg hover:bg-[#004BE1]">
            Icons
          </div>
          <div className="pl-3 pr-8 py-3 hover:border-r-2 border-r-[#FFE81A] rounded-s-lg hover:bg-[#004BE1]">
            Icons
          </div>
          <div className="pl-3 pr-8 py-3 hover:border-r-2 border-r-[#FFE81A] rounded-s-lg hover:bg-[#004BE1]">
            Icons
          </div>
          <div className="pl-3 pr-8 py-3 hover:border-r-2 border-r-[#FFE81A] rounded-s-lg hover:bg-[#004BE1]">
            Icons
          </div>
        </div>
        <div>Logout</div>
      </div>
      <div className="flex pl-36">
        <div>All Chats</div>
        <div>Chat</div>
      </div>
    </div>
  );
};

export default Chat1;
