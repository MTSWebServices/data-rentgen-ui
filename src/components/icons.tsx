import AerospikeIcon from "@assets/icons/aerospike.svg?react";
import ApacheAirflowIcon from "@assets/icons/apache-airflow.svg?react";
import ApacheCassandraIcon from "@assets/icons/apache-cassandra.svg?react";
import ApacheFlinkIcon from "@assets/icons/apache-flink.svg?react";
import ApacheHadoopIcon from "@assets/icons/apache-hadoop.svg?react";
import ApacheHiveIcon from "@assets/icons/apache-hive.svg?react";
import ApacheKafkaIcon from "@assets/icons/apache-kafka.svg?react";
import ApacheSparkIcon from "@assets/icons/apache-spark.svg?react";
import ClickhouseIcon from "@assets/icons/clickhouse.svg?react";
import DagsterIcon from "@assets/icons/dagster.svg?react";
import DataRentgenIcon from "@assets/icons/data-rentgen.svg?react";
import DatasetIcon from "@assets/icons/dataset.svg?react";
import DBTIcon from "@assets/icons/dbt.svg?react";
import DebeziumIcon from "@assets/icons/debezium.svg?react";
import FeastIcon from "@assets/icons/feast.svg?react";
import GreenplumIcon from "@assets/icons/greenplum.svg?react";
import MongoDBIcon from "@assets/icons/mongodb.svg?react";
import MSSQLServerIcon from "@assets/icons/microsoft-sql-server.svg?react";
import MySQLIcon from "@assets/icons/mysql.svg?react";
import OracleIcon from "@assets/icons/oracle.svg?react";
import PostgreSQLIcon from "@assets/icons/postgresql.svg?react";
import PrefectIcon from "@assets/icons/prefect.svg?react";
import RedisIcon from "@assets/icons/redis.svg?react";
import ReplickIcon from "@assets/icons/replick.svg?react";
import SnowflakeIcon from "@assets/icons/snowflake.svg?react";
import StarRocksIcon from "@assets/icons/starrocks.svg?react";
import SyncMasterIcon from "@assets/icons/syncmaster.svg?react";
import TeradataIcon from "@assets/icons/teradata.svg?react";
import TrinoIcon from "@assets/icons/trino.svg?react";
import { ReactElement } from "react";
import { Cloud, Computer, Public, QuestionMark } from "@mui/icons-material";

const IconByName = ({ name }: { name: string }): ReactElement => {
    const nameLower = name.toLowerCase().split(/[^a-z]/)[0];

    switch (nameLower) {
        case "aerospike":
            return <AerospikeIcon />;
        case "airflow":
            return <ApacheAirflowIcon />;
        case "cassandra":
            return <ApacheCassandraIcon />;
        case "clickhouse":
            return <ClickhouseIcon />;
        case "dagster":
            return <DagsterIcon />;
        case "dbt":
            return <DBTIcon />;
        case "debezium":
            return <DebeziumIcon />;
        case "feast":
            return <FeastIcon />;
        case "flink":
            return <ApacheFlinkIcon />;
        case "greenplum":
            return <GreenplumIcon />;
        case "hive":
            return <ApacheHiveIcon />;
        case "kafka":
            return <ApacheKafkaIcon />;
        case "mongodb":
            return <MongoDBIcon />;
        case "mysql":
            return <MySQLIcon />;
        case "oracle":
            return <OracleIcon />;
        case "postgres":
            return <PostgreSQLIcon />;
        case "prefect":
            return <PrefectIcon />;
        case "redis":
            return <RedisIcon />;
        case "replick":
            return <ReplickIcon />;
        case "snowflake":
            return <SnowflakeIcon />;
        case "spark":
            return <ApacheSparkIcon />;
        case "sqlserver":
            return <MSSQLServerIcon />;
        case "starrocks":
            return <StarRocksIcon />;
        case "syncmaster":
            return <SyncMasterIcon />;
        case "teradata":
            return <TeradataIcon />;
        case "trino":
            return <TrinoIcon />;
        case "hadoop":
        case "hdfs":
        case "yarn":
            return <ApacheHadoopIcon />;
        case "abfs":
        case "abfss":
        case "dbfs":
        case "ftp":
        case "ftps":
        case "sftp":
        case "s3":
        case "samba":
        case "webdav":
        case "wasb":
        case "wasbs":
            return <Cloud />;
        case "local":
        case "file":
            return <Computer />;
        case "http":
        case "https":
            return <Public />;
        default:
            return <QuestionMark />;
    }
};

export {
    ApacheAirflowIcon,
    ApacheFlinkIcon,
    ApacheHadoopIcon,
    ApacheHiveIcon,
    ApacheKafkaIcon,
    ApacheSparkIcon,
    ClickhouseIcon,
    DBTIcon,
    GreenplumIcon,
    MSSQLServerIcon,
    MongoDBIcon,
    MySQLIcon,
    OracleIcon,
    PostgreSQLIcon,
    TeradataIcon,
    DatasetIcon,
    DataRentgenIcon,
    ReplickIcon,
    SyncMasterIcon,
    IconByName,
};
