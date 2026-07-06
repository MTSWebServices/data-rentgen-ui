import AerospikeIcon from "@assets/icons/aerospike.svg?react";
import AmazonAthenaIcon from "@assets/icons/amazon-athena.svg?react";
import AmazonGlueIcon from "@assets/icons/amazon-glue.svg?react";
import ApacheAirflowIcon from "@assets/icons/apache-airflow.svg?react";
import ApacheCassandraIcon from "@assets/icons/apache-cassandra.svg?react";
import ApacheFlinkIcon from "@assets/icons/apache-flink.svg?react";
import ApacheHadoopIcon from "@assets/icons/apache-hadoop.svg?react";
import ApacheHiveIcon from "@assets/icons/apache-hive.svg?react";
import ApacheKafkaIcon from "@assets/icons/apache-kafka.svg?react";
import ApacheSparkIcon from "@assets/icons/apache-spark.svg?react";
import AzureCosmosDBIcon from "@assets/icons/azure-cosmosdb.svg?react";
import AzureKustoIcon from "@assets/icons/azure-kusto.svg?react";
import ClickhouseIcon from "@assets/icons/clickhouse.svg?react";
import CrateDBIcon from "@assets/icons/cratedb.svg?react";
import DagsterIcon from "@assets/icons/dagster.svg?react";
import DatabricksIcon from "@assets/icons/databricks.svg?react";
import DataRentgenIcon from "@assets/icons/data-rentgen.svg?react";
import DatasetIcon from "@assets/icons/dataset.svg?react";
import DBTIcon from "@assets/icons/dbt.svg?react";
import DebeziumIcon from "@assets/icons/debezium.svg?react";
import FeastIcon from "@assets/icons/feast.svg?react";
import GoogleBigQueryIcon from "@assets/icons/google-bigquery.svg?react";
import GoogleCloudSpannerIcon from "@assets/icons/google-cloud-spanner.svg?react";
import GoogleCloudStorageIcon from "@assets/icons/google-cloud-storage.svg?react";
import GooglePubSubIcon from "@assets/icons/google-pubsub.svg?react";
import GreenplumIcon from "@assets/icons/greenplum.svg?react";
import MicrosoftFabricIcon from "@assets/icons/microsoft-fabric.svg?react";
import MicrosoftSQLServerIcon from "@assets/icons/microsoft-sql-server.svg?react";
import MicrosoftSharePointIcon from "@assets/icons/microsoft-sharepoint.svg?react";
import MilvusIcon from "@assets/icons/milvus.svg?react";
import MongoDBIcon from "@assets/icons/mongodb.svg?react";
import MySQLIcon from "@assets/icons/mysql.svg?react";
import OceanbaseIcon from "@assets/icons/oceanbase.svg?react";
import OracleIcon from "@assets/icons/oracle.svg?react";
import PostgreSQLIcon from "@assets/icons/postgresql.svg?react";
import PrefectIcon from "@assets/icons/prefect.svg?react";
import RedisIcon from "@assets/icons/redis.svg?react";
import RedshiftIcon from "@assets/icons/redshift.svg?react";
import ReplickIcon from "@assets/icons/replick.svg?react";
import SnowflakeIcon from "@assets/icons/snowflake.svg?react";
import StarRocksIcon from "@assets/icons/starrocks.svg?react";
import SyncMasterIcon from "@assets/icons/syncmaster.svg?react";
import TeradataIcon from "@assets/icons/teradata.svg?react";
import TrinoIcon from "@assets/icons/trino.svg?react";
import { ReactElement } from "react";
import { Cloud, Computer, Public, QuestionMark } from "@mui/icons-material";

/*
 * Here we add all technology icons which are either:
 * - A part of job type, e.g. SPARK_APPLICATION -> spark
 * - A part of location scheme, e.g. postgres://...
 *
 * See OpenLineage naming convention for the latter:
 * https://openlineage.io/docs/spec/naming/
 *
 * Every icon should be:
 * - SVG image
 * - 32x32 pixels max
 * - have a comment pointing to the source of .svg file
 */
const ICONS = {
    aerospike: <AerospikeIcon />,
    airflow: <ApacheAirflowIcon />,
    awsathena: <AmazonAthenaIcon />,
    awsglue: <AmazonGlueIcon />,
    azurecosmos: <AzureCosmosDBIcon />,
    azurekusto: <AzureKustoIcon />,
    bigquery: <GoogleBigQueryIcon />,
    cassandra: <ApacheCassandraIcon />,
    clickhouse: <ClickhouseIcon />,
    crate: <CrateDBIcon />,
    dagster: <DagsterIcon />,
    databricks: <DatabricksIcon />,
    dbfs: <DatabricksIcon />,
    dbt: <DBTIcon />,
    debezium: <DebeziumIcon />,
    feast: <FeastIcon />,
    "fabric-warehouse": <MicrosoftFabricIcon />,
    flink: <ApacheFlinkIcon />,
    greenplum: <GreenplumIcon />,
    hive: <ApacheHiveIcon />,
    kafka: <ApacheKafkaIcon />,
    milvus: <MilvusIcon />,
    mongodb: <MongoDBIcon />,
    mysql: <MySQLIcon />,
    oceanbase: <OceanbaseIcon />,
    oracle: <OracleIcon />,
    postgres: <PostgreSQLIcon />,
    prefect: <PrefectIcon />,
    pubsub: <GooglePubSubIcon />,
    redis: <RedisIcon />,
    redshift: <RedshiftIcon />,
    replick: <ReplickIcon />,
    mssharepoint: <MicrosoftSharePointIcon />,
    snowflake: <SnowflakeIcon />,
    spanner: <GoogleCloudSpannerIcon />,
    spark: <ApacheSparkIcon />,
    sqlserver: <MicrosoftSQLServerIcon />,
    starrocks: <StarRocksIcon />,
    syncmaster: <SyncMasterIcon />,
    teradata: <TeradataIcon />,
    trino: <TrinoIcon />,
    hadoop: <ApacheHadoopIcon />,
    hdfs: <ApacheHadoopIcon />,
    yarn: <ApacheHadoopIcon />,
    abfs: <Cloud />,
    abfss: <Cloud />,
    gs: <GoogleCloudStorageIcon />,
    ftp: <Cloud />,
    ftps: <Cloud />,
    sftp: <Cloud />,
    s3: <Cloud />,
    samba: <Cloud />,
    webdav: <Cloud />,
    wasb: <Cloud />,
    wasbs: <Cloud />,
    local: <Computer />,
    file: <Computer />,
    http: <Public />,
    https: <Public />,
};

const IconByName = ({ name }: { name: string }): ReactElement => {
    const nameLower = name.toLowerCase().split(/[^a-z]/)[0];

    if (nameLower in ICONS) {
        return ICONS[nameLower as keyof typeof ICONS];
    }

    return <QuestionMark />;
};

export { DatasetIcon, DataRentgenIcon, IconByName };
