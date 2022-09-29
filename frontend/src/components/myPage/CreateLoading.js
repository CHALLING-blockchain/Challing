import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChallengeList } from "../../app/redux/allChallengeSlice";
import ContractAPI from "../../api/ContractAPI";

function CreateLoading() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(0);
  let flag = true;
  flag = useLocation().state.state;
  function linkToMain() {
    console.log("실행");
    navigate("/");
  }

  useEffect(() => {
    console.log("flag", flag);
    if (flag) {
      linkToMain();
    }

    async function load() {
      const Contract = new ContractAPI();
      await Contract.getAllChallenge().then((result) => {
        console.log("loading", Object.keys(result).length);

        setCheck(check + 1);

        if (Object.keys(result).length === Number(id)) {
          dispatch(setChallengeList(result));
          navigate(`/challenge-detail/${id}`);
        }
      });
    }
    load();
  });

  return (
    <div>
      <h2>로딩중</h2>
    </div>
  );
}

export default CreateLoading;
