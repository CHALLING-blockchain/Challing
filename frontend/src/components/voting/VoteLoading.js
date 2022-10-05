import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ContractAPI from "../../api/ContractAPI";
import Loading from "../common/Loading";

function VoteLoading() {
  const navigate = useNavigate();
  const [cnt, setCnt] = useState(0);
  const vote = useLocation().state.vote;

  useEffect(() => {
    const Contract = new ContractAPI();
    async function load() {
      const newVote = await Contract.getVote(vote.id);
      if (newVote.userIdList.length > vote.userIdList.length) {
        navigate(`/voting/${vote.id}`, {
          state: { vote: newVote },
        });
      }
      setCnt(cnt + 1);
    }
    load();
  }, [cnt]);

  return (
    <div>
      <Loading></Loading>
    </div>
  );
}

export default VoteLoading;
