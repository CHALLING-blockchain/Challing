import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContractAPI from "../../api/ContractAPI";
import Loading from "../common/Loading";

function CompleteLoading() {
  const { id, cid } = useParams();
  const navigate = useNavigate();
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    const Contract = new ContractAPI();
    async function load() {
      await Contract.findByChallengerId(Number(cid)).then((response) => {
        setCnt(cnt + 1);
        if (response.receiveRefund === true)
          navigate(`/completed-detail/${id}`);
      });
      load();
    }

    load();
  }, [cnt, cid, id, navigate]);

  return (
    <div>
      <Loading></Loading>
    </div>
  );
}

export default CompleteLoading;
