import Page from "componenets/Page/Page";
import StatsCard from "componenets/StatsCard/StatsCard";
import "./Home.scss";
import {File, Database, Clock, Tasks} from "Icons/Icons";
import Files from "componenets/Files/Files";

const TopContent = () => {
  return <div className="stats-wrapper">
    <StatsCard
      title="Uploaded files"
      mainStat="120"
      gradColor="orange"
      icon={<File />}
    />

    <StatsCard
      title="Data amount"
      mainStat="1GB"
      gradColor="red"
      icon={<Database />}
    />

    <StatsCard
      title="Files in queue"
      mainStat="100"
      gradColor="teal"
      icon={<Clock />}
    />

    <StatsCard
      title="Files to approve"
      mainStat="21"
      gradColor="green"
      icon={<Tasks />}
    />
  </div>
}

export default () => {
  return <Page title={"Home"} topContent={<TopContent />}>
    <Files isFrontpage={true} itemsPerPage={10} />
  </Page>
};
