import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChallengeList } from "../../app/redux/allChallengeSlice";
import ContractAPI from "../../api/ContractAPI";
import Loading from "../common/Loading";

function CreateLoading() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(0);
  let flag = true;
  flag = useLocation().state.state;
  function linkToMain() {
    navigate("/");
  }

  useEffect(() => {
    if (flag) {
      linkToMain();
    }

    async function load() {
      const Contract = new ContractAPI();
      await Contract.getAllChallenge().then((result) => {
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
      <Loading></Loading>
    </div>
  );
}

export default CreateLoading;
